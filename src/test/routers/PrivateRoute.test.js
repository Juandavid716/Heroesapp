import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoutes } from "./../../routers/PrivateRoutes";
import { AuthContext } from "./../../auth/authContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <span> Saliendo de aqui </span>,
}));
describe("Pruebas en PrivateRoute", () => {
  Storage.prototype.setItem = jest.fn();
  test("Debe de mostrar el componente si está autenticado y guardar en Local Storage", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Pepe",
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoutes>
            <h1>Private Component</h1>
          </PrivateRoutes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find("h1").text().trim()).toBe("Private Component");
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });

  test("debe de bloquear el componente si no está autenticado", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoutes>
            <h1>Private Component</h1>
          </PrivateRoutes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find("span").text().trim()).toBe("Saliendo de aqui");
  });
});
