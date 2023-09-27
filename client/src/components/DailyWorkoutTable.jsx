import "./DailyWorkoutTable.css";

const DailyWorkoutTable = ({ dailyexercises, onDelete, onUpdate }) => {

  const onSubmit = (e, _id) => {
    e.preventDefault();
    console.log(e)
    console.log(e.target)
    console.log(_id)

    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const updatedExercise = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onUpdate(updatedExercise, _id);
  };

  return (
    <>
      <div className="titleAndDate">
        <div className="dailyWorkoutTitle">DAILY WORKOUT PLANNER</div>
        <div className="date">{new Date().toString().slice(4, 15)}</div>
      </div>

      <div className="DailyWorkoutTable">

        <table>
          <thead>
            <tr>
              <th className="thName">Name</th>
              <th className="thId">Id</th>
              <th className="thTarget">Target</th>
              <th className="thEquipment">Equipment</th>
              <th className="thSets">Sets</th>
              <th className="thReps">Reps</th>
              <th className="thWeight">Weight</th>
              <th className="thNotes">Notes</th>
            </tr>
          </thead>
        </table>

        <div className="tabledata">
          {dailyexercises && dailyexercises.map((exercise) => (
            <form key={exercise._id} onSubmit={(e) => onSubmit(e, exercise._id)}>
              <table>
                <tbody>

                  <tr key={exercise.id}>
                    <td className="exercisename">{exercise.name.toUpperCase()}</td>
                    <td className="exerciseid">{exercise.id}</td>
                    <td className="exercisetarget">{exercise.target}</td>
                    <td className="exerciseequipment">{exercise.equipment}</td>
                    <td>
                      <input
                        className="sets"
                        name="sets"
                        defaultValue={exercise.sets}
                      />
                    </td>
                    <td>
                      <input
                        className="reps"
                        name="reps"
                        defaultValue={exercise.reps}
                      />
                    </td>
                    <td>
                      <input
                        className="weight"
                        name="weight"
                        defaultValue={exercise.weight}
                      />
                    </td>
                    <td>
                      <input
                        className="notes"
                        name="notes"
                        defaultValue={exercise.notes}
                      />
                    </td>
                    <td>
                      <button className="updateExercise" type="submit">UPDATE</button>
                      <button className="deleteExercise" type="button" onClick={() => onDelete(exercise._id)}>
                        X
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </form>
          ))}</div>
      </div>
    </>
  );
};

export default DailyWorkoutTable;