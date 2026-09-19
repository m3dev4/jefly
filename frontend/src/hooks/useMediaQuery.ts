import React from "react";

interface Props {
  query: string;
}

const useMediaQuery = ({ query }: Props) => {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia(query).matches);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, [query]);

  return isDesktop;
};

export default useMediaQuery;
