import { render, screen } from '@testing-library/react';
import Sidebar from 'pages/Sidebar';

describe('Sidebar', () => {
  it('renders login form when open', () => {
    render(<Sidebar isOpen={true} toggleNavbar={() => {}} handleLogout={() => {}} />);
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  it('does not render login form when closed', () => {
    render(<Sidebar isOpen={false} toggleNavbar={() => {}} handleLogout={() => {}} />);
    const loginForm = screen.queryByTestId('login-form');
    expect(loginForm).not.toBeInTheDocument();
  });
});
