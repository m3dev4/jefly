from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from Service.models import Service
from User.models import User, UserRole
from announcer.models import Announcer
from freelance.models import Freelancee
from mission.models import Mission


class PropositionViewSetTests(APITestCase):
    def setUp(self):
        self.service = Service.objects.create(name="Développement web")
        self.announcer_user = User.objects.create_user(
            email="announcer@example.com",
            password="password123",
            role=UserRole.ANNONCEUR,
            first_name="Announceur",
            last_name="Test",
            number_phone="770000001",
        )
        self.announcer_profile = Announcer.objects.create(user=self.announcer_user)
        self.freelance_user = User.objects.create_user(
            email="freelance@example.com",
            password="password123",
            role=UserRole.FREELANCE,
            first_name="Freelance",
            last_name="Test",
            number_phone="770000002",
        )
        self.freelance_profile = Freelancee.objects.create(
            user=self.freelance_user,
            title="Développeur Fullstack",
            description="Profil de test",
            service=self.service,
        )
        self.mission = Mission.objects.create(
            title="Créer un site vitrine",
            description="Projet de développement d'un site vitrine pour une startup.",
            date_deadline=date(2026, 12, 31),
            operateurMobileMoney="WAVE",
            budget=500000,
            service=self.service,
            annonceur=self.announcer_profile,
        )
        self.list_url = reverse("proposition-list")

    def test_freelance_can_create_proposition_before_mission_deadline(self):
        self.client.force_authenticate(self.freelance_user)

        response = self.client.post(
            self.list_url,
            {
                "mission": self.mission.pk,
                "lettre_motivation": "Je suis motivé pour ce projet.",
                "date_livraison": "2026-12-15",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["mission"], self.mission.pk)
        self.assertEqual(response.data["proposition_status"], "PENDING")

    def test_proposed_delivery_date_cannot_exceed_mission_deadline(self):
        self.client.force_authenticate(self.freelance_user)

        response = self.client.post(
            self.list_url,
            {
                "mission": self.mission.pk,
                "lettre_motivation": "Je soumets une date trop tardive.",
                "date_livraison": "2027-01-02",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("date_livraison", response.data)

    def test_freelance_cannot_submit_two_proposals_for_same_mission(self):
        self.client.force_authenticate(self.freelance_user)

        first_response = self.client.post(
            self.list_url,
            {
                "mission": self.mission.pk,
                "lettre_motivation": "Première proposition.",
                "date_livraison": "2026-12-10",
            },
            format="json",
        )
        self.assertEqual(first_response.status_code, status.HTTP_201_CREATED)

        second_response = self.client.post(
            self.list_url,
            {
                "mission": self.mission.pk,
                "lettre_motivation": "Seconde proposition interdite.",
                "date_livraison": "2026-12-20",
            },
            format="json",
        )

        self.assertEqual(second_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", second_response.data)
