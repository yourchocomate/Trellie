import React, { useEffect, useState } from "react";
import axios from "axios";
import { Peoples } from "../components/sections";
import { Navbar } from "../components/ui"

const HomePage = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios.get("/api/people").then(res => {
            setPeople(res.data.data);
        })
    },[]);
    
    return(
        <Navbar>
            <Peoples people={people}/>
        </Navbar>
    );
}

export default HomePage;