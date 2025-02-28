import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ApiClient from "@/api/apiClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "@/redux/slice";
import Link from "next/link";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DehazeIcon from "@mui/icons-material/Dehaze";
import StarIcon from "@mui/icons-material/Star";
import ConditionalDownloadButton from "../ConditionalDownloadButton";
import Image from "next/image";

const GaliDesawar = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("GALI DESAWAR"));
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    setLoading(true);
    ApiClient.galiGames()
      .then((res) => setInfo(res?.data))
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  };

  const renderHeader = () => (
    <div className="p-4 flex flex-col items-center gap-4 my-6 bg-gray-900 text-white shadow-lg rounded-xl w-full">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-md">
        {/* Game Rates Button */}
        <Link
          href="/galidesawar/game-rates"
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 transition transform hover:scale-105"
        >
          <CurrencyRupeeIcon className="mr-3 text-2xl sm:text-3xl" />
          <span className="text-sm sm:text-base">Game Rates</span>
        </Link>

        {/* Win History Button */}
        <Link
          href="/galidesawar/win-history"
          className="flex items-center justify-center px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full shadow hover:bg-yellow-700 transition transform hover:scale-105"
        >
          <StarIcon className="mr-3 text-2xl sm:text-3xl" />
          <span className="text-sm sm:text-base">Win History</span>
        </Link>

        {/* Bid History Button */}
        <Link
          href="/galidesawar/bidding-history"
          className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700 transition transform hover:scale-105"
        >
          <DehazeIcon className="mr-3 text-2xl sm:text-3xl" />
          <span className="text-sm sm:text-base">Bid History</span>
        </Link>
      </div>
    </div>
  );

  const renderGames = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
        {info?.result.map((game, index) => {
          const isClosed = game?.msg_status > 1;
          const { game_name, game_id, close_result, open_result } = game;

          return (
            <div
              key={index}
              className={`flex flex-col bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-4 transition-all duration-300 ${
                isClosed ? "bg-red-100" : "bg-green-100"
              }`}
              
            >
              

              {/* Bottom Section with Chart Icon, Status, and Play/Closed Button side by side */}
              <div className="flex justify-between gap-2 items-center mb-4">
                {/* Chart Icon */}
                <div className="flex items-center justify-center">
                  <Link
                    href={`https://backend.dailykalyan.in/gali-game-result-chart/${game.game_id}`}
                    target="_blank"
                  >
                    <div className=" rounded-full  flex items-center justify-center w-16 h-16">
                      <Image
                        src={"/Chart.png"}
                        width={80}
                        height={50}
                        alt="chart"
                        className="mx-auto"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-md font-semibold truncate w-full text-center">
                    {game_name}
                  </span>
                  <div className="font-semibold text-sm  mt-1 text-center">
                  {game.open_result || game.close_result || "XX"}
                  </div>
                </div>

                {/* Play/Closed Button */}
                <div
                  className="flex items-center justify-center"
                  onClick={() => {
                    const route = isClosed
                          ? "/login"
                        :`/galidesawar/${game_name}/${game_id}`
                        if (!isClosed) {
                          router.push({
                            pathname: route,
                          });
                      router.push({
                        pathname: route,
                        query: { data: JSON.stringify(game) },
                      });
                    }
                  }}
                >
                  <div className="  rounded-full flex items-center justify-center w-14 h-14">
                    <Image
                      src={isClosed ? "/closed-icon.png" : "/Play-icon.png"}
                      width={80}
                      height={50}
                      alt="icon"
                      className="mx-auto"
                    />
                  </div>
                </div>

              </div>

              {/* Status (LIVE or Bid Closed) */}
              <div className="flex items-center justify-center space-x-2 mt-[-30px]">
                {/* Market Status */}
                <p className="text-sm mt-3 text-black">
                  Market status:{" "}
                  <span
                    className={isClosed ? "text-red-600" : "text-green-600"}
                  >
                    {isClosed ? "Closed" : "Running"}
                  </span>
                </p>
              </div>

              {/* Divider Line */}
              <hr className="border-t border-black" />

              {/* Open and Close Times */}
              <div className="flex justify-center items-center mt-3">
                {/* Close Time */}
                <div className="text-xs text-gray-500 pr-4">
                  Market Close: {game?.open_time || "N/A"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-black">
      {renderHeader()}
      {loading ? <Loader show={loading} /> : renderGames()}
    </div>
  );
};

export default GaliDesawar;
