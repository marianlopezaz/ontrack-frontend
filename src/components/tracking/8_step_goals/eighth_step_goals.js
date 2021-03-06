import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'
import localStyles from './styles.module.scss'
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormHelperText, IconButton, OutlinedInput, InputAdornment } from '@material-ui/core';
import AddItemList from '../../commons/add_item_list/add_item_list';
import { editGoalsService, addMultipleGoalsService } from '../../../utils/goals/services/goals_services';


const INITIAL_STATE = {
    promedio: '',
    asistencia: '',
    cualitativos: []
}

const VALIDATE_INITIAL_STATE = {
    promedio: false,
    asistencia: false,
};



const EighthStepGoals = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const trackingData = useSelector((store) => store.tracking);

    const handleChange = (prop) => (event) => {
        let value = event.target.value
        hadleValidation(prop, value);
        setState({ ...state, [prop]: value });
        handleGlobalState(prop, value)
    }

    const hadleValidation = (prop, value) => {
        if (prop === "promedio") {
            let puntaje = parseInt(value, 10)
            if ((puntaje >= 0 && puntaje <= 10) || value === "") {
                setValidation({
                    ...validation,
                    [prop]: false
                })
            } else {
                setValidation({
                    ...validation,
                    [prop]: true
                })
            }
        } else {
            setValidation({
                ...validation,
                [prop]: !((value > 0 && value <= 100) || value === ""),
            });
        }
    };

    const handleQualitativeGoals = (qualitativeItems) => {
        handleGlobalState && handleGlobalState("cualitativos", qualitativeItems);
    }

    return (
        <>
            <div className={styles.container}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h6 className="left" className={localStyles.goals_title}>M??tricas:</h6>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}`}>

                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container} style={{ marginLeft: '-10px' }}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormControl variant="outlined">
                                        <FormLabel className="left" component="legend">Promedio: (No requerido)</FormLabel>
                                        <OutlinedInput
                                            id='promedio'
                                            name="promedio"
                                            variant="outlined"
                                            value={state.promedio}
                                            onChange={handleChange("promedio")}
                                            type="number"
                                            inputProps={{ min: "0", max: "10", step: "1" }}
                                            required
                                            style={{
                                                padding: '5px'
                                            }}
                                        />
                                    </FormControl>
                                    {validation.promedio && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            El promedio debe ser un n??mero comprendido entre 0 y 10.
                                        </FormHelperText>
                                    )}
                                </Col>

                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormControl variant="outlined">
                                        <FormLabel className="left" component="legend">Asistencia %:  (No requerido)</FormLabel>
                                        <OutlinedInput
                                            id='asistencia'
                                            name="asistencia"
                                            variant="outlined"
                                            value={state.asistencia}
                                            onChange={handleChange("asistencia")}
                                            type="number"
                                            required
                                            style={{
                                                padding: '5px'
                                            }}
                                        />
                                    </FormControl>
                                    {validation.asistencia && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            La asistencia debe ser un valor de 1 a 100 (%).
                                        </FormHelperText>
                                    )}
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </motion.div>
            </div>
            <div className={styles.container}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={localStyles.goals_header}>
                        <h6 className="left" className={localStyles.goals_title}>Objetivos:</h6>
                    </div>

                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}`}>
                            <AddItemList
                                labelText={"A??ade un objetivo"}
                                handleList={handleQualitativeGoals}
                                previousItems={trackingData.cualitativos}
                            />
                        </Col>
                    </Row>
                </motion.div>
            </div>
        </>
    )
}


export default EighthStepGoals;