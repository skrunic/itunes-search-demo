import { useState, useEffect } from "react";
import uuid from "react-uuid";

const RotatingList = ({ itemsList, setItemsList }) => {
    const [timer, setTimer] = useState(0);

    // Shift array members
    const rotateArray = (array, from, to) => {
        let elem = array.splice(from, 1)[0];
        array.splice(to, 0, elem);
        return array;
    }

    // Refresh interval
    useEffect(() => {
        const interval = setInterval(() => {
            let newArr = rotateArray(itemsList, 0, itemsList.length - 1);
            //console.log("Album list: ", itemsList);
            setItemsList(newArr);
            setTimer(timer => timer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, itemsList]);

    // List render
    return (
        <ul>
            {
                itemsList.length > 0 ?
                    itemsList.slice(0, 5).map(i => {
                        return (<li key={uuid()} className="result">{i}</li>)
                    })
                    : <li className="no-result">No result</li>
            }
        </ul>
    );
}

export default RotatingList;