import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Hero } from "./../../components/hero/Hero";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("Pruebas en HeroScreen", () => {
  test("no debe de mostrar el heroScreen si no hay un heroe en el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<Hero />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find("h1").text().trim()).toBe("No hero Page");
  });

  test("debe de mostrar un heroe si el parametro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<Hero />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("Debe de regresar a la pantalla anterior", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<Hero />} />
        </Routes>
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("debe de mostrar el no heroe Page si no tenemos un heroe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider3423432"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<Hero />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe("No hero Page");
  });
});
