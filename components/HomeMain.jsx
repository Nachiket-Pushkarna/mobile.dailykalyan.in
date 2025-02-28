import Link from "next/link";
import Info from "./Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ApiClient from "@/api/apiClient";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { getSetData } from "@/utils";
import { bgImage } from "@/resources/images";
import ModalComponent from "./Moda";
import Howtoplay from "@/pages/howtoplay";
import { useSelector } from "react-redux";
import { withdrawlicon } from "@/resources/images";
import { setContactDetails } from "@/redux/slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ConditionalDownloadButton from "@/pages/ConditionalDownloadButton";
import { FaDownload } from "react-icons/fa"; // Import Download Icon
import ActionButtons from "./ActionButton";

const HomeMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const modalVisibleDetails = getSetData("closeModal");

  const [data, setData] = useState({});
  const [datawl, setDatawl] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SlidingText, setSlidingText] = useState(null);
  const [contactDetails, setContactDetailsData] = useState({});
  const router = useRouter();
  const query = router.query;

  const reduxData = useSelector((state) => state?.data);
  const { contact_details } = reduxData;
  const dispatch = useDispatch();

  let info = data?.result || [];
  let infowl = datawl?.result || [];

  useEffect(() => {
    const checkAuth = () => {
      const token = getSetData("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    setModalVisible(!modalVisibleDetails);
  }, [modalVisibleDetails]);

  const getContactData = () => {
    ApiClient.getContactDetails()
      .then((res) => {
        if (res?.data?.data && res?.data?.data[0]) {
          let data = res?.data?.data[0];
          dispatch(setContactDetails(data));
          setContactDetailsData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInfo();
    } else {
      fetchpublicGames();
    }
    fetChImages();

    getContactData();
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (query.welcomesound === "true" && audioRef.current) {
  //     audioRef.current
  //       .play()
  //       .then(() => {
  //         router.replace(router.pathname, undefined, { shallow: true });
  //       })
  //       .catch((error) => {
  //         console.error("Audio playback failed:", error);
  //       });
  //   }
  // }, [query.welcomesound, router]);

  useEffect(() => {
    if (query.transaction === "true") {
      Swal.fire({
        title: "Success!",
        text: "Payment Successful!",
        icon: "success",
      });
    } else if (query.transaction === "false") {
      Swal.fire({
        title: "Oops!",
        text: "Payment Failed!",
        icon: "error",
      });
    }

    if (query.transaction) {
      const newUrl =
        router.pathname +
        router.asPath.replace(/(\?|&)transaction=[^&]*(&|$)/, "$1");
      router.replace(newUrl, undefined, { shallow: true });
    }
  }, [query.transaction]);

  const fetchInfo = () => {
    setLoading(true);
    ApiClient.dashbordInfo()
      .then((res) => {
        setData(res?.data);
        let newData = structuredClone(res?.data);
        delete newData.result;
        getSetData("basicDetails", newData || {}, true);
      })
      .catch((error) => {
        console.error("Error fetching dashboard info:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchpublicGames = () => {
    ApiClient.indexPageGames()
      .then((res) => {
        setDatawl({ result: res.data.game_result });
      })
      .catch((error) => {
        console.error("Error fetching public games:", error);
      });
  };

  const fetchSliderText = () => {
    ApiClient.getSliderText({
      app_key: "@34@Y#456)D9)(JE4dsj36f$%#(jodiplay!com)8fe8345*&^ef8ef8",
    })
      .then((res) => {
        setSlidingText(res.data.content.newsText);
      })
      .catch((err) => {
        console.error("Error fetching slider text:", err);
      });
  };

  const fetChImages = () => {
    ApiClient.homeSliderImages({
      app_key: "@34@Y#456)D9)(JE4dsj36f$%#(jodiplay!com)8fe8345*&^ef8ef8",
    })
      .then((res) => {
        if (res?.data?.status && Array.isArray(res.data.sliderdata)) {
          setSliderImages(res.data.sliderdata);
        } else {
          console.error("Invalid slider data format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching slider images:", err);
      });
  };

  const getMarketTimes = (a) => {
    return {
      openTime: a?.open_time || "N/A",
      closeTime: a?.close_time || "N/A",
    };
  };

  const showInfoModal = () => {
    if (!isAuthenticated) {
      return <></>;
    }
    return (
      <ModalComponent
        setShow={(res) => {
          setModalVisible(res);
          getSetData("closeModal", !res);
        }}
        show={modalVisible}
      >
        <Howtoplay />
      </ModalComponent>
    );
  };

  const formatGameResult = (game) => {
    const { openNumber, openResult, closeResult, closeNumber } = game;

    const format = (value, defaultValue) => {
      if (value === "***") return "XXX";
      if (value === "*") return "X";
      if (value === "0" || value === 0) return "0";
      return value || defaultValue;
    };

    const formattedOpen = format(openNumber, "XXX");
    const formattedOpenResult = format(openResult, "X");
    const formattedCloseResult = format(closeResult, "X");
    const formattedClose = format(closeNumber, "XXX");

    return `${formattedOpen} - ${formattedOpenResult} ${formattedCloseResult} - ${formattedClose}`;
  };

  const renderGameswithoutlogin = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {infowl.map((game, index) => {
          const isClosed =
            new Date() >
            new Date(`${new Date().toDateString()} ${game.closeTime}`);
          const { game_name, game_url, openTime, closeTime } = game;

          const slug = game_url.split("/").pop();

          return (
            <div
              key={index}
              className={`flex flex-col bg-gray-800 rounded-lg shadow-lg  p-4  ${
                isClosed ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {/* Bottom Section with Chart Icon, Middle Text, and Play Icon */}
              <div className="flex justify-between items-center mb-4">
                {/* Chart Icon */}
                <div className="flex items-center justify-center">
                  <Link
                    href={isAuthenticated ? `${game.web_chart_url}` : "/login"}
                    target={isAuthenticated ? "_blank" : ""}
                  >
                    <div className="  rounded-full flex items-center justify-center w-16 h-16">
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
                  <a href={`/games/${slug}`} className="w-full">
                    <span className="text-md font-semibold truncate w-full text-center">
                      {game_name}
                    </span>
                  </a>
                  <div className="font-semibold text-sm mt-1 text-center">
                    {formatGameResult(game)}
                  </div>
                </div>

                {/* Play/Closed Button */}
                <div
                  onClick={() => {
                    if (!isClosed && isAuthenticated) {
                      router.push({
                        pathname: `/game-dashboard/${game_name}`,
                        query: { data: JSON.stringify(game) },
                      });
                    } else if (!isAuthenticated) {
                      window.location.href =
                        "https://backend.dailykalyan.in/logo/daily_kalyan.apk";
                    }
                  }}
                  className="flex items-center justify-center"
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
              <hr className="border-t border-black my-2" />

              {/* Open and Close Times */}
              <div className="flex justify-between items-center mt-[-2px] mb-0">
                {/* Open Time */}
                <div className="text-xs text-gray-500 pl-4">
                  Open: {openTime}
                </div>

                {/* Close Time */}
                <div className="text-xs text-gray-500 pr-4">
                  Close: {closeTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderGames = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mt-4">
        {info?.map((game, index) => {
          let isClosed = game?.msg_status > 1;
          let { game_name, game_id, close_result, open_result } = game;
          const { openTime, closeTime } = getMarketTimes(game);

          return (
            <div
              key={index}
              className={`flex flex-col bg-gray-800 rounded-lg shadow-lg hover:shadow-xl p-4 transition-all duration-300 ${
                isClosed ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {/* Bottom Section with Chart Icon, Status, and Play/Closed Button side by side */}
              <div className="flex justify-between  items-center mb-4">
                {/* Chart Icon */}
                <div className="flex items-center justify-center">
                  <Link
                    href={isAuthenticated ? `${game.web_chart_url}` : "/login"}
                    target={isAuthenticated ? "_blank" : ""}
                  >
                    <div className=" rounded-full  flex items-center justify-center w-16 h-16">
                      <Image
                        src={"/Chart.png"}
                        width={80}
                        height={50}
                        alt="chart"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-md truncate w-full  font-semibold text-center">
                    {game_name}
                  </span>
                  <div className="font-semibold text-sm  mt-1 text-center">
                    {open_result || "XXX - X"}
                    {close_result || "X - XXX"}
                  </div>
                </div>

                {/* Play/Closed Button */}
                <div
                  className="flex items-center justify-center"
                  onClick={() => {
                    if (!isClosed) {
                      let route = isAuthenticated
                        ? `/game-dashboard/${game_name}/${game_id}`
                        : "/login";
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
              <hr className="border-t border-black  " />

              {/* Open and Close Times */}
              <div className="flex justify-between items-center mt-2">
                {/* Open Time */}
                <div className="text-xs text-gray-500 pl-4">
                  Open: {openTime}
                </div>

                {/* Close Time */}
                <div className="text-xs text-gray-500 pr-4">
                  Close: {closeTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // const renderCarousel = () => {
  //   if (!sliderImages?.length) {
  //     return <></>;
  //   }

  //   return sliderImages.map((item, index) => {
  //     return (
  //       <div
  //         className={`carousel-item ${index === 0 ? "active" : ""}`}
  //         key={item.image_id}
  //         style={{ height: "40dvh" }}
  //       >
  //         <Link
  //           href={item.slider_link || "#"}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <img
  //             src={item.slider_image || ""}
  //             className="d-block w-100"
  //             alt={`Slider image ${item.image_id}`}
  //             style={{ height: "48dvh", width: "100dvw", objectFit: "fill" }}
  //           />
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

  if (isLoading) {
    return <Loader show={true} />;
  }

  return (
    <div
      className={`maxWidth px-3 ${
        !isAuthenticated ? "showbackgroundnl" : "bg-gray-700  "
      }`}
    >
      {isAuthenticated ? (
        <div className="d-flex my-3 justify-content-between">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="yellow-gradient text-large1 stol-500"
            id="scroll-text"
          >
            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="10" /* Adjust speed */
              style={{
                fontSize: "1.2rem",
                color: "#00659e",
                whiteSpace: "nowrap",
              }}
            >
              {SlidingText} &nbsp;&nbsp;&nbsp; {SlidingText}
            </marquee>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {!isAuthenticated && (
        <a href="https://backend.jodiplay.com/logo/daily_kalyan.apk">
          <div className="fixed bottom-0 left-0 w-full px-4 z-40 bg-green-600 overflow-hidden">
            <button className="relative w-full flex items-center justify-center text-white font-bold py-3 rounded-lg shadow-md transition hover:bg-green-700">
              {/* Left Icon */}
              <FaDownload className="absolute left-4 text-md text-white animate-bounce" />

              {/* Main Content */}
              <span className="text-sm font-semibold">
                Download Mobile App to Play
              </span>

              {/* Right Icon */}
              <FaDownload className="absolute right-4 text-md text-white animate-bounce" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white opacity-10 animate-shine"></div>
            </button>
          </div>
        </a>
      )}

      {/* {showInfoModal()} */}

      {!isAuthenticated && (
        <section className="d-lg-none sm-d-block sectionhome">
          <div className="container">
            <div className="row">
              <div
                style={{ marginTop: "25px" }}
                className="col-12 text-center sm-heading"
              >
                <div className="stol-400 stol-400 text-small1">
                  India's Most Trusted Matka Play App
                </div>
                <div
                  className="yellow-gradient text-large1 stol-500"
                  id="scroll-text"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      animation: "scrollText 20s linear infinite",
                      fontSize: "1.2rem",
                    }}
                  >
                    Welcome to Daily Kalyan -
                  </div>
                  <div
                    style={{
                      display: "block",
                      animation: "scrollText 20s linear infinite",
                      fontSize: "1.2rem",
                    }}
                  >
                    Online Matka play app
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-4">
                {/* <Link href="/login"> */}
                <img
                  src="banner-img.png"
                  alt="banner Image"
                  className="policy-shadow-mobile mt-3 w-95 h-95"
                />
                {/* </Link> */}
                <a
                  href="https://backend.jodiplay.com/logo/daily_kalyan.apk"
                  download
                >
                  <div className="static_downloadbtn__empire btn-style sm-no-margin mt-5 ">
                    <p className="downloadp">Download App</p>
                  </div>
                </a>
                <div
                  id="androidParagraph"
                  className="android-paragraph text-white pt-1 stol-b text-13"
                  style={{ display: "block" }}
                >
                  <p style={{ color: "#ffce41" }}>For Better User Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div>
        {/* <div
          style={{ marginTop: "0px" }}
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        > */}
        {/* <div className="carousel-inner">{renderCarousel()}</div> */}
        {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button> */}
        {/* </div> */}
      </div>
      <ActionButtons
        isAuthenticated={isAuthenticated}
        contact_details={contactDetails?.whatsapp_no}
      />

      {!isAuthenticated ? (
        <></>
      ) : (
        <div className="flex items-center bg-purple-800 justify-between p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-auto">
  {/* Left Container with Link and Abbreviations */}
  <div className="flex flex-col items-center space-y-4">
    <Link
      href={isAuthenticated ? "/galidesawar" : "/login"}
      className="text-center font-semibold w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-300"
    >
      Gali Desawar Market
    </Link>
    <div className="text-center text-white font-semibold">
      DS, GL, FB, GB, SG, DB
    </div>
  </div>

  {/* Right Container with Larger Image */}
  <div className="flex items-center justify-center">
    <Link href={isAuthenticated ? "/galidesawar" : "/login"}>
      <Image src="/Gd-play.png" width={60} height={160} alt="Gd Play" className="rounded-lg shadow-lg" />
    </Link>
  </div>
</div>
      )}
      {!isAuthenticated ? (
        <>
          <div className="text-center">{renderGameswithoutlogin()}</div>
          <Info />
        </>
      ) : (
        <div className="text-center">{renderGames()}</div>
      )}

      <Loader show={loading} />
    </div>
  );
};

export default HomeMain;
