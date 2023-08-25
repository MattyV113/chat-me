import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-[100vh] m-auto flex" id="error-page">
      <div className="flex h-[400px] text-4xl w-[500px] text-red-600 text-center justify-center flex-col m-auto ">
        <h1>Oops!</h1>
        <p>
          Sorry, this url is{' '}
          <i>
            {error.statusText || error.message}, please navigate to a proper
            page.
          </i>
        </p>
        <p></p>
      </div>
    </div>
  );
}
