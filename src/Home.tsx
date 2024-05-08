import { Link } from 'react-router-dom';
import cardImages from './ultis/cardImport';

function Home() {

  return (
    <div className='flex justify-center items-center h-screen w-full bg-cover bg-no-repeat bg-center bg-[url("./assets/header_keyart__3_.avif")] '>
      <div>
        <div className='flex flex-col justify-around gap-5'>
          <Link to="/createRoom">
            <div className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
              <button className="flex-1 font-bold text-xl bg-white px-6 py-1 rounded-full ">
                CRIAR SALA
              </button>
            </div>
          </Link>

          <Link to="/joinRoom">
            <div className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
              <button className="flex-1 font-bold text-xl bg-white px-6 py-1 rounded-full">
                ENTRAR EM SALA
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
