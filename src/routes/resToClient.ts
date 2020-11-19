import { Router } from 'express';

import { userAlreadyExistResponse } from '../controllers/resToClient/resToClient';

const router = Router();

router.get("/to-client/user-already-exists", userAlreadyExistResponse)


export const resToClientRoute = router;