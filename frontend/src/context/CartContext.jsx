import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [korpa, setKorpa] = useState([]);

    // učitaj korpu iz localStorage na startu
    useEffect(() => {
        const stored = localStorage.getItem("korpa");
        if (stored) setKorpa(JSON.parse(stored));
    }, []);

    // svaki put kad se promijeni korpa → spremi u localStorage
    useEffect(() => {
        localStorage.setItem("korpa", JSON.stringify(korpa));
    }, [korpa]);

    // dodaj u korpu
    const dodajUKorpu = (proizvod) => {
        const postoji = korpa.find((p) => p.id === proizvod.id);

        if (postoji) {
            setKorpa(
                korpa.map((p) =>
                    p.id === proizvod.id ? { ...p, kolicinaUKorpi: p.kolicinaUKorpi + 1 } : p
                )
            );
        } else {
            setKorpa([...korpa, { ...proizvod, kolicinaUKorpi: 1 }]);
        }
    };

    // ukloni iz korpe
    const ukloniIzKorpe = (id) => {
        setKorpa(korpa.filter((p) => p.id !== id));
    };

    // promijeni količinu
    const promijeniKolicinu = (id, novaKolicina) => {
        setKorpa(
            korpa.map((p) =>
                p.id === id ? { ...p, kolicinaUKorpi: Number(novaKolicina) } : p
            )
        );
    };

    // očisti korpu
    const ocistiKorpu = () => setKorpa([]);

    return (
        <CartContext.Provider
            value={{ korpa, dodajUKorpu, ukloniIzKorpe, promijeniKolicinu, ocistiKorpu }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
