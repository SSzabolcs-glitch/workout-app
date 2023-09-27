import DailyWorkoutTable from "./DailyWorkoutTable";
import { useState, useEffect } from "react";


const updateDailyExercise = (dailyExercise, _id) => {
    console.log(dailyExercise)
    console.log("CLIENT EXERCISE PATCH")
    return fetch(`http://localhost:3001/api/dailyexercises/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dailyExercise),
    }).then((res) => res.json());
  };

  const deleteDailyExercise = (_id) => {
    console.log(_id)
    console.log("CLIENT DELETE EXERCISE")
    return fetch(`http://localhost:3001/api/dailyexercises/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };



const DailyWorkout = () => {

    //ez felel a működésért
    //a returnben visszatér a DailyWorkoutTable-lel, átadva a propsokat
    
    const [dailyexercises, setDailyexercises] = useState(null)

    //console.log(dailyexercises)
    
    useEffect(() => {
        console.log("ez a useEffect")

        fetch("http://localhost:3001/api/dailyexercises")
            .then(res => res.json())
            .then((dailyexercises) => {
                setDailyexercises(dailyexercises)
                console.log(dailyexercises)
            })
    }, []);

    const handleDelete = (_id) => {
        console.log(_id)
        console.log("handledelete")
        deleteDailyExercise(_id)

        setDailyexercises((dailyexercises) => {
            return dailyexercises.filter((dailyexercise) => dailyexercise._id !== _id);
          })
    }
    
    const handleUpdate = (dailyExercise, id) => {
        console.log(dailyExercise, id)
        updateDailyExercise(dailyExercise, id)
    }
    
    return (
        <DailyWorkoutTable
            dailyexercises={dailyexercises}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
    />
    )
}

export default DailyWorkout;

//a főoldalon lesz egy Add to daily workout gomb
//ekkor hozzáadja a mongoDB "dailyworkouts" collection-höz az objektumot
//ez a DailyWorkout fetcheli le az objektumokat + szerver!
//state-be mentjük a fetchelt adatokat, és a táblázatba átadjuk props-ként