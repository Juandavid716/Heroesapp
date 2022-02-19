import { AppRouter } from "./../../routers/AppRouter";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
describe("Pruebas en AppRouter", () => {
  const contextValue = {
    user: {
      logged: false,
    },
  };
  test("Si el usuario no está autenticado debe mostrarse el login screen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper.find("h1").text().trim()).toBe("Login Screen");
  });

  test("Debe mostrar el componente de marvel si está autenticado", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Juan",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
