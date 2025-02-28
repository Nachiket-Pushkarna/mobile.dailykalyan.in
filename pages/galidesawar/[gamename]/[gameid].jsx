import { setHeaderTitle } from "@/redux/slice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LeftDigit, RightDigit, jodiDice_icon } from "@/resources/images";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function GameType() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gamename, gameid } = router.query;

  useEffect(() => {
    if (gamename) {
      dispatch(setHeaderTitle(gamename));
    }
  }, [gamename, dispatch]);

  return (
    <div className="relative bg-gray-900 min-h-screen p-4">
      {/* Back Button in Top-Left */}
      <div
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-blue-800 border p-2 text-white font-medium cursor-pointer"
      >
        <ArrowBackIcon />
      </div>

      {/* Centered Stacked Images */}
      <div className="flex flex-col items-center justify-center h-full mt-9">
        <a
          className="cursor-pointer"
          onClick={() =>
            router.push(`/galidesawar/${gamename}/play/LEFT-DIGIT/${gameid}`)
          }
        >
          <img className="h-32 w-32" src={LeftDigit} alt="Left Digit" />
        </a>
        <div
          className="cursor-pointer mt-4"
          onClick={() =>
            router.push(`/galidesawar/${gamename}/play/RIGHT-DIGIT/${gameid}`)
          }
        >
          <img className="h-32 w-32" src={RightDigit} alt="Right Digit" />
        </div>
        <div
          className="cursor-pointer mt-4"
          onClick={() =>
            router.push(`/galidesawar/${gamename}/play/JODI-DIGIT/${gameid}`)
          }
        >
          <img className="h-32 w-32" src={jodiDice_icon} alt="Jodi Dice" />
        </div>
      </div>
    </div>
  );
}

export default GameType;
