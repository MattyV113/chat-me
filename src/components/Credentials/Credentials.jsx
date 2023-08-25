import PropTypes from 'prop-types';

function Credentials({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <div>
      <form className=" w-[50%] gap-2 m-auto flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="border m-auto border-black rounded p-2 w-[80%]"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          className="border m-auto border-black rounded p-2 w-[80%]"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border m-auto border-black rounded p-2 w-[80%]"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
}

Credentials.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  setUsername: PropTypes.func,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
};

export default Credentials;
