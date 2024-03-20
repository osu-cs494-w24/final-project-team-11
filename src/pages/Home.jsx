import { Outlet } from 'react-router-dom';

export function Home() {
  return (
    <>
      <p id="hometext">This is the home page, click on a section to get started!</p>
      <main>
        <Outlet />
      </main>
    </>
  );
}