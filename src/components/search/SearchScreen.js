import React, { useMemo } from "react";
import { useForm } from "./../hooks/useForm";
import { getHeroesByName } from "./../../helpers/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchScreen = () => {
  const [query] = useSearchParams();
  const search = query.get("q") || "";

  const initialForm = {
    searchText: search,
  };

  const navigate = useNavigate();

  console.log(search);

  const [formValues, handleInputChange] = useForm(initialForm);

  const { searchText } = formValues;
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  const heroesFiltered = useMemo(() => getHeroesByName(search), [search]);
  return (
    <div className="mt-3">
      <h1>Búsquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            ></input>

            <button className="btn btn-outline-primary mt-1 " type="submit">
              Buscar
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          {search === "" ? (
            <div className="alert alert-info"> Buscar un héroe</div>
          ) : (
            heroesFiltered.length === 0 && (
              <div className="alert alert-danger">
                No hay resultados: {search}
              </div>
            )
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
