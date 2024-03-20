import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <h1>Error</h1>
      <p>{error.statusText || error.message}</p>
    </>
  );
}