import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientsService.getOnePatient(req.params.id);
    res.json(patient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.post('/', (req, res) => {
  try {
    const patientData = toNewPatient(req.body);

    const newPatient = patientsService.addPatient(patientData);

    res.json(newPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
