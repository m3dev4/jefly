export const MISSIONS = [
  {
    tags: [
      {
        label: 'Nouveau',
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        outline: 'outline-green-500/20',
      },
      {
        label: 'Urgent',
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        outline: 'outline-orange-400/20',
      },
    ],
    title: "Design & Développement d'une App Mobile de Fintech",
    location: 'Dakar, Sénégal (Remote OK)',
    stack: ['Figma', 'React Native', 'Stripe API'],
    budgetLabel: 'Budget Total',
    budget: '750.000 FCFA',
    avatars: 2,
  },
  {
    tags: [
      {
        label: 'Long Terme',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        outline: 'outline-blue-500/20',
      },
    ],
    title: "Refonte UX/UI de l'E-shop local (Abidjan)",
    location: "Abidjan, Côte d'Ivoire",
    stack: ['Shopify', 'UX Research'],
    budgetLabel: 'Budget Total',
    budget: '450.000 FCFA',
    avatars: 1,
  },
  {
    tags: [
      {
        label: 'Audit',
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        outline: 'outline-orange-400/20',
      },
    ],
    title: 'Audit de Sécurité Plateforme Cloud',
    location: 'Remote Only',
    stack: ['Cybersecurity', 'AWS'],
    budgetLabel: 'Tarif Journalier',
    budget: '120.000 FCFA',
    avatars: 1,
  },
];

export const FILTERS = [
  { label: 'Budget:', value: 'Tous les budgets' },
  { label: 'Compétences:', value: 'React, UI/UX' },
  { label: 'Date limite:', value: 'Cette semaine' },
];


export const NAV_LINKS = [
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Trouver une mission", href: "#missions" },
  { label: "Trouver un freelance", href: "#freelances" },
  { label: "À propos", href: "#a-propos" },
];