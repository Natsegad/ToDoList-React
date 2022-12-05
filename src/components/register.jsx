import React, { useState } from "react"
import axios from "axios"
import "../styles/register.css"

export const Register = () => {
    const onChange = (event) => {
        event.persist();
        setRegData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            };
        });
    };

    const onRegisterClick = () => {
        console.log(regData);
        fetch("http://localhost:8080/register/", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                nickname:regData.nick,
                password:regData.pass
            })
        }).then(async (response)=>{
            if(response.status == 200){
                const resJson = await response.json();
                console.log(response.status,resJson.token);
            }else{
                console.log(response.status,await response.json());
            }
        }).catch((err)=>{
            console.log(err);
        });

    };

    let [regData, setRegData] = useState(() => {
        return {
            nick: "",
            pass: ""
        }
    })

    return (
        <div className="register">
            <div className="reg-form">
                <label className="nick-label">Nickname</label>
                <input className="nick-input" onChange={onChange} value={regData.nick} name="nick"></input>

                <label className="pass-label">Password</label>
                <input className="pass-input" onChange={onChange} value={regData.pass} name="pass" type="password"></input>

                <button className="reg-button" onClick={onRegisterClick}>Register</button>
            </div>
        </div>
    )
}