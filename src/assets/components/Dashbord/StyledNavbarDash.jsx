import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const StyledAside = styled.aside`
  height: 100vh;
`;

export const StyledTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.4rem;
`;

export const StyledLogo = styled.div`
  display: flex;
  gap: 0.8rem;

  img {
    width: 5rem;
    height: 5rem;
  }
`;

export const StyledClose = styled.div`
  display: none;
`;

export const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 86vh;
  position: relative;
  top: 3rem;

  a {
    display: flex;
    color: var(--color-info-dark);
    margin-left: 2rem;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.7rem;
    transition: all 300ms ease;
    text-decoration: none;

    span {
      font-size: 1.6rem;
      transition: all 300ms ease;
    }

    &:last-child {
      position: absolute;
      bottom: 2rem;
      width: 100%;
    }

    &.active {
      background: var(--color-light);
      color: var(--color-primary);
      margin-left: 0;

      &:before {
        content: "";
        width: 6px;
        height: 95%;
        background: var(--color-primary);
        position: absolute;
        left: 0;
      }

      span {
        color: var(--color-primary);
        margin-left: calc(1rem - 3px);
      }
    }

    &:hover {
      color: var(--color-primary);

      span {
        margin-left: 1rem;
      }
    }
  }
`;

export default function StyledNavbarDash() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <StyledAside>
      <StyledTop>
        <div>
          <h2>
            Enri <span className="danger">car</span>
          </h2>
        </div>
      </StyledTop>

      <StyledSidebar>
        <a onClick={() => navigate("/dashboard")}>
          <span className="material-symbols-outlined">
            space_dashboard
          </span>
          <h3>Dashboard</h3>
        </a>

        {user?.role === "admin" && (
          <a onClick={() => navigate("/customers")}>
            <span className="material-symbols-outlined">person</span>
            <h3>Customers</h3>
          </a>
        )}

        <a onClick={() => navigate("/settings")}>
          <span className="material-symbols-outlined">
            settings
          </span>
          <h3>Configuração</h3>
        </a>

        <a onClick={handleLogout}>
          <span className="material-symbols-outlined">
            logout
          </span>
          <h3>Logout</h3>
        </a>
      </StyledSidebar>
    </StyledAside>
  );
}