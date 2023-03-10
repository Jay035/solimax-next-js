import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { ActivePools, UpcomingPools, CompletedPools } from "../data/PoolsData";
import { useAccount } from "wagmi";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const { isConnected } = useAccount();
  const [menuState, setMenuState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [proposalTag, setProposalTag] = useState("all");
  const [content, setContent] = useState();
  const [errorMessage, setErrorMessage] = useState("")

  const menuItems = [
    {
      title: "About us",
      href: "#about-us",
    },
    {
      title: "Tokenomics",
      href: "#tokenomics",
    },
    {
      title: "Roadmap",
      href: "#roadmap",
    },
    {
      title: "Launchpad",
      href: "/launchpad",
    },
    {
      title: "How to buy",
      href: "#how-to-buy",
    },
    {
      title: "Contact us",
      href: "#contact",
    },
  ];

  const [poolsData, setPoolsData] = useState([]);
  const [selectedPool, setSelectedPool] = useState("active");
  const [selectedTab, setSelectedTab] = useState("active");
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  // const activePools = poolsData.filter(item => item.tag === "active");
  // const upcomingPools = poolsData.filter(item => item.tag === "upcoming");
  // const completedPools = poolsData.filter(item => item.tag === "completed");

  useEffect(() => {
    switch (selectedPool) {
      case "active":
        setPoolsData(ActivePools);
        break;
      case "upcoming":
        setPoolsData(UpcomingPools);
        break;
      case "completed":
        setPoolsData(CompletedPools);
        break;
      default:
        setPoolsData(ActivePools);
    }
    // setPoolsData(activePools);
  }, [selectedPool]);

  // useEffect(() => {
    // switch (proposalTag) {
  //   case "all":
      
  //     break;
  //   case "active":
      
  //     break;
  //   case "all":
      
  //     break;
  
  //   default:
  //     break;
  // }
  // }, proposalTag)
  //   console.log(menuItems)

  return (
    <GlobalContext.Provider
      value={{
        menuState,
        checkboxState,
        menuItems,
        setMenuState,
        setCheckboxState,
        poolsData,
        selectedPool,
        setSelectedPool,
        isConnected,
        selectedTab,
        setSelectedTab,
        filterValue,
        setContent,
        setFilterValue,
        content,
        proposalTag,
        setProposalTag,
        errorMessage,
        setErrorMessage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function GlobalAuth() {
  return useContext(GlobalContext);
}

// GlobalContextProvider.propTypes = {
//   poolProgressValue: PropTypes.number,
//   menuState: PropTypes.bool
// }
