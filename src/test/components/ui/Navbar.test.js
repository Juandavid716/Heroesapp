import { mount } from "enzyme";
import { Navbar } from "./../../../ui/Navbar";
import { AuthContext } from "./../../../auth/authContext";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("Pruebas en <Navbar/>", () => {
  const mockDispatch = jest.fn();
  const contextValue = {
    user: {
      logged: true,
      name: "Pedro",
    },
    dispatch: mockDispatch,
  };
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
  test("Debe de mostrar correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Pedro");
  });

  test("debe de llamar el logout, llamar navigate y el dispatch con los argumentos", () => {
    const bottomLogout = wrapper.find("button");
    bottomLogout.simulate("click", () => {});
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
  });
});
