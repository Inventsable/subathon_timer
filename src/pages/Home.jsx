import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import queryString from "query-string";
import { SketchPicker } from "react-color";
import FontPicker from "font-picker-react";

function Home(props) {
  const [startingHours, setStartingHours] = useState(5);
  const [startingMinutes, setStartingMinutes] = useState(0);
  const [startingSeconds, setStartingSeconds] = useState(0);
  const [bitsTime, setBitsTime] = useState(60);
  const [bitsAmount, setBitsAmount] = useState(500);
  const [donationsTime, setDonationsTime] = useState(60);
  const [T1SubsciptionTime, setT1SubsciptionTime] = useState(300);
  const [T2SubsciptionTime, setT2SubsciptionTime] = useState(600);
  const [T3SubsciptionTime, setT3SubsciptionTime] = useState(900);
  const [socketToken, setSocketToken] = useState("");
  const [channelName, setChannelName] = useState("");
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 100 });
  const [fontSize, setFontSize] = useState(150);
  const [followTime, setFollowTime] = useState(0);
  const [font, setFont] = useState("Open Sans");
  const [api, setApi] = useState(localStorage.getItem("apiType"));

  const changeColor = (props) => {
    console.log(props.rgb);
    setColor(props.rgb);
    localStorage.setItem("colorR", props.rgb.r);
    localStorage.setItem("colorG", props.rgb.g);
    localStorage.setItem("colorB", props.rgb.b);
    localStorage.setItem("colorA", props.rgb.a);
  };

  const changeFont = (props) => {
    localStorage.setItem("fontSize", props);
    setFontSize(props);
  };

  const resetDefault = () => {
    setStartingHours(5);
    setStartingMinutes(0);
    setStartingSeconds(0);
    setBitsTime(60);
    setDonationsTime(60);
    setT1SubsciptionTime(300);
    setT2SubsciptionTime(600);
    setT3SubsciptionTime(900);
    setColor({ r: 0, g: 0, b: 0, a: 100 });
    setFontSize(150);
    setFollowTime(0);
    setBitsAmount(500);
    setFont("Open Sans");
  };

  const saveToken = (target) => {
    setSocketToken(target);
    localStorage.setItem("token", target);
  };

  // load in saved effects
  useEffect(() => {
    if (localStorage.totalTimeSeconds) {
      setStartingHours(Math.floor(localStorage.totalTimeSeconds / (60 * 60)));
      setStartingMinutes(Math.floor((localStorage.totalTimeSeconds / 60) % 60));
      setStartingSeconds(Math.floor(localStorage.totalTimeSeconds % 60));
    }
    if (localStorage.colorR !== undefined) {
      setColor({
        r: localStorage.colorR,
        g: localStorage.colorG,
        b: localStorage.colorB,
        a: localStorage.colorA,
      });
    }
    if (localStorage.fontSize) {
      setFontSize(localStorage.fontSize);
    }
    if (localStorage.T1SubsciptionTime) {
      setT1SubsciptionTime(localStorage.T1SubsciptionTime);
    }
    if (localStorage.T2SubsciptionTime) {
      setT2SubsciptionTime(localStorage.T2SubsciptionTime);
    }
    if (localStorage.T3SubsciptionTime) {
      setT3SubsciptionTime(localStorage.T3SubsciptionTime);
    }
    if (localStorage.donationsTime) {
      setDonationsTime(localStorage.donationsTime);
    }
    if (localStorage.bitsTime) {
      setBitsTime(localStorage.bitsTime);
    }
    if (localStorage.bitsAmount) {
      setBitsAmount(localStorage.bitsAmount);
    }
    if (localStorage.followTime) {
      setFollowTime(localStorage.followTime);
    }
    if (localStorage.token) {
      setSocketToken(localStorage.token);
    }
    if (localStorage.channelName) {
      setChannelName(localStorage.channelName);
    }
    // eslint-disable-next-line
  }, []);

  const setMinutes = (target) => {
    if (target >= 60) {
      setStartingMinutes(0);
      setStartingHours(startingHours + 1);
    } else if (target < 0 && startingHours > 0) {
      setStartingMinutes(59);
      setStartingHours(startingHours - 1);
    } else if (target < 0 && startingHours <= 0) {
      setStartingMinutes(0);
    } else {
      setStartingMinutes(target);
    }
  };

  const setSeconds = (target) => {
    console.log(target, startingHours, startingMinutes, startingSeconds);
    if (target >= 60 && startingMinutes >= 59) {
      setStartingHours(startingHours + 1);
      setStartingMinutes(0);
      setStartingSeconds(0);
    } else if (target < 0 && startingMinutes <= 0 && startingHours > 0) {
      setStartingHours(startingHours - 1);
      setStartingMinutes(59);
      setStartingSeconds(59);
    } else if (target < 0 && startingMinutes > 0) {
      setStartingSeconds(59);
      setStartingMinutes(startingMinutes - 1);
    } else if (target < 0 && startingMinutes <= 0 && startingHours <= 0) {
      setStartingSeconds(0);
    } else if (target >= 60) {
      setStartingSeconds(0);
      setStartingMinutes(startingMinutes + 1);
    } else {
      setStartingSeconds(target);
    }
  };

  useEffect(() => {
    localStorage.setItem("T1SubsciptionTime", T1SubsciptionTime);
    localStorage.setItem("T2SubsciptionTime", T2SubsciptionTime);
    localStorage.setItem("T3SubsciptionTime", T3SubsciptionTime);
    localStorage.setItem("donationsTime", donationsTime);
    localStorage.setItem("bitsTime", bitsTime);
    localStorage.setItem("followTime", followTime);
    localStorage.setItem("channelName", channelName);
    localStorage.setItem("bitsAmount", bitsAmount);

    // eslint-disable-next-line
  }, [
    T1SubsciptionTime,
    T2SubsciptionTime,
    T3SubsciptionTime,
    donationsTime,
    bitsTime,
    followTime,
    channelName,
    bitsAmount,
  ]);

  const submit = () => {
    localStorage.setItem(
      "totalTimeSeconds",
      startingHours * 60 * 60 + startingMinutes * 60 + startingSeconds * 1
    );
    localStorage.setItem("fontType", font);
    localStorage.setItem("apiType", api);
  };

  return (
    <div className="bg-white px-4 font-sans">
      <div className="font-sans font-bold text-2xl">
        {" "}
        Obsidian subathon Timer - add this as a browser source to your OBS then
        interact with it{" "}
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span> Hours: </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="hours"
                min="0"
                value={startingHours}
                size="5"
                onChange={(e) => setStartingHours(e.target.value)}
              />
              <span> Minutes: </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="minutes"
                min="-1"
                max="60"
                value={startingMinutes}
                size="5"
                onChange={(e) => setMinutes(e.target.value)}
              />
              <span> Seconds: </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                min="-1"
                max="60"
                value={startingSeconds}
                size="5"
                onChange={(e) => setSeconds(e.target.value)}
              />
              <br />

              <span> Seconds per Follow </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={followTime}
                onChange={(e) => setFollowTime(e.target.value)}
              />
              <br />
              <span>
                {" "}
                Seconds per{" "}
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500 w-24"
                  type="number"
                  id="Seconds"
                  value={bitsAmount}
                  onChange={(e) => setBitsAmount(e.target.value)}
                />{" "}
                bits{" "}
              </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={bitsTime}
                onChange={(e) => setBitsTime(e.target.value)}
              />
              <br />
              <span> Donations - seconds per $1 </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={donationsTime}
                onChange={(e) => setDonationsTime(e.target.value)}
              />
              <br />
              <span> T1 Subscription Time (seconds) </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={T1SubsciptionTime}
                onChange={(e) => setT1SubsciptionTime(e.target.value)}
              />
              <br />
              <span> T2 Subscription Time (seconds) </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={T2SubsciptionTime}
                onChange={(e) => setT2SubsciptionTime(e.target.value)}
              />
              <br />
              <span> T3 Subscription Time (seconds) </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                id="Seconds"
                value={T3SubsciptionTime}
                onChange={(e) => setT3SubsciptionTime(e.target.value)}
              />
            </td>
            <td>
              <span className="font-sans font-bold text-xl">
                {" "}
                Your Channel Name:
              </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="text"
                placeholder="channel name e.g. iitztimmy"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              <br />
              <span className="font-sans font-bold text-xl">
                {" "}
                Streamlabs Socket API Token (KEEP SECRET){" "}
              </span>
              <br />
              <span className="font-sans font-bold text-xl">
                {" "}
                OR StreamElements JWT Token{" "}
              </span>
              <br />
              <span className="font-sans font-bold text-xl">
                {" "}
                StreamElements is MORE RELIABLE than StreamLabs{" "}
              </span>
              <br />
              <span className="font-sans font-bold text-xl">
                {" "}
                Pick whichever you have donations setup for
              </span>
              <br />
              <span className="font-sans font-bold text-xl">
                {" "}
                If no token is given, defaults to just being a countdown timer{" "}
              </span>
              <br />
              <span>
                {" "}
                {`Streamlabs -> settings -> API tokens -> Your Socket API Token`}{" "}
              </span>
              <br />
              <button
                className={`${
                  api == "0"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-200 text-black"
                } hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-400 active:bg-sky-700 px-4 py-2 mx-2 text-xm leading-5 rounded-md font-semibold`}
                onClick={(e) => {
                  setApi("0");
                }}
              >
                {" "}
                None{" "}
              </button>
              <button
                className={`${
                  api == "1"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-200 text-black"
                } hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-400 active:bg-sky-700 px-4 py-2 mx-2 text-xm leading-5 rounded-md font-semibold`}
                onClick={(e) => {
                  setApi("1");
                }}
              >
                {" "}
                StreamLabs{" "}
              </button>
              <button
                className={`${
                  api == "2"
                    ? "bg-sky-500 text-white"
                    : "bg-zinc-200 text-black"
                } hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-400 active:bg-sky-700 px-4 py-2 mx-2 text-xm leading-5 rounded-md font-semibold`}
                onClick={(e) => {
                  setApi("2");
                }}
              >
                {" "}
                StreamElements{" "}
              </button>
              {/* <select id = "dropdown" value = {api} onChange={e => setApi(e.target.value)}>
                                <option value = "0">None</option>
                                <option value = "1">Streamlabs Token</option>
                                <option value = "2">StreamElements JWT Token</option>
                            </select>    */}
              <br />
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="text"
                id="JWT-Token"
                value={socketToken}
                onChange={(e) => saveToken(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <span> Background of timer will be invisible </span>
      <br />
      <table>
        <tbody>
          <tr>
            <td rowSpan="3">
              <SketchPicker color={color} onChange={changeColor} />
            </td>
            <td>
              <FontPicker
                apiKey="AIzaSyCzMaCc8--N8lwowxSl2hYq5dZkgeGvWyg "
                activeFontFamily={font}
                limit={70}
                sort={"popularity"}
                onChange={(nextFont) => setFont(nextFont.family)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span
                className="apply-font"
                style={{
                  color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  fontSize: `${fontSize}px`,
                }}
              >
                {" "}
                {startingHours > 9
                  ? startingHours
                  : ("0" + startingHours).slice(-2)}
                :{("0" + startingMinutes).slice(-2)}:
                {("0" + startingSeconds).slice(-2)}{" "}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span> Text size </span>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-sky-500"
                type="number"
                value={fontSize}
                onChange={(e) => changeFont(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button
        className="bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-400 active:bg-sky-700 px-4 py-2 text-xm leading-5 rounded-md font-semibold text-white"
        onClick={resetDefault}
      >
        {" "}
        Reset all to Default{" "}
      </button>
      <br />
      <br />
      <span> Count down timer size and colour on next page below </span>
      <br />
      <span>
        {" "}
        Click on the timer on the next page to come back to this screen{" "}
      </span>
      <br />
      <button
        className="bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-400 active:bg-sky-700 px-4 py-2 text-xm leading-5 rounded-md font-semibold text-white"
        onClick={submit}
      >
        <Link
          to={{
            pathname: "/countdown",
            state: {
              timeSeconds:
                startingHours * 60 * 60 +
                startingMinutes * 60 +
                startingSeconds * 1,
              bitsTime: bitsTime,
              bitsAmount: bitsAmount,
              donationsTime: donationsTime,
              T1: T1SubsciptionTime,
              T2: T2SubsciptionTime,
              T3: T3SubsciptionTime,
              Token: socketToken,
              Color: color,
              FontSize: fontSize,
              FollowTime: followTime,
              FontType: font,
              Api: api,
              ChannelName: channelName,
            },
          }}
        >
          {" "}
          START Countdown
        </Link>
      </button>
    </div>
  );
}

export default withRouter(Home);
