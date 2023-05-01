import { render, screen } from '@testing-library/react';
import Sidebar from 'pages/Sidebar';
import { User } from 'models/User';

const mockUser = User.from_dict({
  id: 1,
  api_key: "1234",
  created_at: "2022-12-12",
  username: "mockUser",
  tokens_available: 1000
});

describe('Sidebar', () => {
  it('renders login form when open', () => {
    render(<Sidebar user={mockUser!} isOpen={true} toggleNavbar={() => {}} handleLogout={() => {}} />);
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  it('does not render login form when closed', () => {
    render(<Sidebar user={mockUser!} isOpen={false} toggleNavbar={() => {}} handleLogout={() => {}} />);
    const loginForm = screen.queryByTestId('login-form');
    expect(loginForm).not.toBeInTheDocument();
  });
});
