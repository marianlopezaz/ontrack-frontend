import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { motion } from "framer-motion";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from './styles.module.css'

import { useState, useEffect } from "react";
import { convertFormatToDatePicker } from "../../utils/commons/common_services";

const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
};

const INITIAL_STATE = {
    fecha: '',
    puntaje: '',
    alumno: '',
    evaluacion: '',
}

const VALIDATE_INITIAL_STATE = {
    puntaje: false,
};


const AddNotasForm = (props) => {
    const [state, setState] = useState({ ...INITIAL_STATE, ["evaluacion"]: props.data.evaluacion, ["alumno"]: props.data.id, ["fecha_hasta"]: props.maxDate });
    const [date, setDate] = useState(props.examDate || null)
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let dateFormatted = convertDate(props.examDate);
        let fechaDesdeFormatted = convertFormatToDatePicker(props.minDate);
        setState({ ...state, ["fecha"]: dateFormatted, ["fecha_desde"]: fechaDesdeFormatted });
    }, [])

    const hadleValidation = (prop, value) => {

        if (prop === "puntaje") {
            let puntaje = parseInt(value, 10)
            if (puntaje >= 0 && puntaje <= 10) {
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
                [prop]: !(value.trim().length > 0),
            });
        }
    };

    const handleChange = (prop) => (event) => {

        hadleValidation(prop, event.target.value);
        setState({ ...state, [prop]: event.target.value })

    };

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    }

    const handleDate = (date) => {
        setDate(date);
        let dateFormatted = convertDate(date);
        setState({ ...state, ["fecha"]: dateFormatted });
    }



    const handleSubmit = (e) => {
        setIsLoading(true);

        let dateSelectedFormatted = Date.parse(convertFormatToDatePicker(state["fecha"]))
        let minimalDate = Date.parse(state["fecha_desde"])
        let maximalDate = Date.parse(new Date().toDateString());

        if (validation["puntaje"] === false &&
            (dateSelectedFormatted >= minimalDate && dateSelectedFormatted <= maximalDate)) {
            props.handleSubmitAction(e, state).then((result) => {
                setIsLoading(false)
                if (result.success) {
                    props.handleClose(false);
                }
            });

        } else {
            e.preventDefault();
            setIsLoading(false);
        }
    }
    return (
        <div>
            <motion.span
                initial="hidden"
                animate="visible"
                variants={list}
                style={{ listStyleType: "none", marginLeft: "0" }}
            >
                <Row>
                    <Col>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                    <motion.li variants={item}>
                                        <FormLabel className="left" component="legend">Fecha del Ex??men</FormLabel>
                                        <KeyboardDatePicker
                                            clearable
                                            value={date}
                                            placeholder="DD/MM/YYYY"
                                            onChange={date => handleDate(date)}
                                            minDate={new Date(state["fecha_desde"])}
                                            maxDate={new Date()}
                                            format="dd/MM/yyyy"
                                            invalidDateMessage="Formato de fecha inv??lido"
                                            minDateMessage="La fecha no deber??a ser menor a la fecha de Inicio del A??o Lectivo seleccionado"
                                            maxDateMessage="La fecha no deber??a ser mayor a la fecha de hoy"
                                            required
                                        />
                                    </motion.li>
                                </Col>
                            </Row>
                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                    <motion.li variants={item}>
                                        <FormControl variant="outlined">
                                            <TextField
                                                id="puntaje"
                                                name="puntaje"
                                                label="Calificaci??n"
                                                variant="outlined"
                                                value={state.puntaje}
                                                onChange={handleChange("puntaje")}
                                                type="number"
                                                required
                                            />
                                        </FormControl>
                                        {validation.puntaje && (
                                            <FormHelperText
                                                className="helper-text"
                                                style={{ color: "rgb(182, 60, 47)" }}
                                            >
                                                La calificaci??n del alumno debe ser un n??mero comprendido entre 0 y 10.
                                            </FormHelperText>
                                        )}
                                    </motion.li>
                                </Col>
                            </Row>
                            <motion.li variants={item}>
                                <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                    <Col>
                                        {!isLoading ?
                                            <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Guardar</button>
                                            :
                                            <button className="ontrack_btn_modal ontrack_btn add_btn" disabled>
                                                <CircularProgress
                                                    size={18}
                                                    color="primary"
                                                />
                                                {" "}Guardando...
                                        </button>
                                        }
                                    </Col>
                                </Row>
                            </motion.li>
                        </form>
                    </Col>
                </Row>
            </motion.span>
        </div>
    );


}
export default AddNotasForm;