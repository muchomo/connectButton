
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";



export default function nav_menu() {


 
 return (
    <div>
     <button id="nav_menu_button"><a href="https://dapp.cronoballz.com" target={"_blank"}>TOKEN STAKING</a></button>
     <button id="nav_menu_button"><a href="https://raffles.cronoballz.com/homerunderby" target={"_blank"}>HOMERUN LOTTO</a></button>
     <button id="nav_menu_button"><a href="https://raffles.cronoballz.com" target={"_blank"}>RAFFLES</a></button>
     <button id="nav_menu_button"><a href="https://cronoballz.com" target={"_blank"}>HOME</a></button>
    </div>
  );
}
