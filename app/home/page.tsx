import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface Offer {
  id: number;
  titre: string;
  description: string;
  tags: string;
  type: string;
  statut: string;
  date_debut: string;
  date_fin: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const offersData = router.query.offers;
    if (typeof offersData === "string") {
      setOffers(JSON.parse(offersData));
    } else {
      console.error("Invalid offers data format");
    }
  }, [router.query.offers]);

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <h2>{offer.titre}</h2>
            <p>{offer.description}</p>
            <p>{offer.type}</p>
            <p>
              {offer.date_debut} - {offer.date_fin}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
