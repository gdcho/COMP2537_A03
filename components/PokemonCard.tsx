import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
}

interface PokeCardProps {
  pokemon: Pokemon;
  filter: string[];
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon, filter }) => {
  const [open, setOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState<any>(null);

  const displayCard = useMemo(() => {
    if (filter.length > 0 && pokemonData) {
      return filter.every((type) =>
        pokemonData.types.some((t: any) => t.type.name === type)
      );
    }
    return true;
  }, [pokemonData, filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pokemon.url]);

  if (!displayCard) {
    return null;
  }

  const PokeDetails = ({ title, items }: { title: string; items: any[] }) => (
    <Typography variant="h6" color={"white"}>
      {title}
      <hr style={{ borderWidth: "2px", borderBlockColor: "blue" }} />
      <ul style={{ color: "white" }}>
        {items.map((item) => (
          <li key={item.name}>
            {item.name[0].toUpperCase() + item.name.slice(1)}{" "}
            {title === "Stats" ? `: ${item.base_stat || ""}` : ""}
          </li>
        ))}
      </ul>
      <br></br>
    </Typography>
);

  return (
    <div
      className="pokeCard bg-gray-200 p-6 rounded shadow border-2 border-blue-500"
      style={{ maxWidth: "300px", maxHeight: "600px" }}
    >
      <Typography variant="h6" className="text-center">
        {pokemon.name.toUpperCase()}
      </Typography>
      <img
        src={pokemonData?.sprites.front_default || "unknown.png"}
        alt={pokemon.name}
        width={100}
        height={100}
        className="mb-2 mx-auto"
      />
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-red-600 active:bg-red-500 text-white font-bold text-sm py-2 px-4 rounded border-black border-2 mt-2"
          onClick={() => setOpen(true)}
        >
          Details
        </button>
      </div>

      {pokemonData && (
        <Dialog
          onClose={() => setOpen(false)}
          open={open}
          sx={{ "& .MuiPaper-root": { width: "400px" } }}
        >
          <DialogTitle>{pokemonData.name.toUpperCase()}</DialogTitle>
          <DialogContent
            style={{
              position: "relative",
              backgroundImage: "url('/pokedexsmall.png')",
              backgroundSize: "cover",
              border: "1px solid red",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: 0.7,
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                width={200}
                height={200}
                className="mx-auto"
              />
              <PokeDetails
                title="Types"
                items={pokemonData.types.map((type: any) => ({
                  name: type.type.name,
                }))}
              />
              <PokeDetails
                title="Abilities"
                items={pokemonData.abilities.map((ability: any) => ({
                  name: ability.ability.name,
                }))}
              />
              <PokeDetails
                title="Stats"
                items={pokemonData.stats.map((stat: any) => ({
                  name: stat.stat.name,
                  base_stat: stat.base_stat,
                }))}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PokeCard;
