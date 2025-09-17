import express from 'express'
import { fetchStream } from '../services/fetchStream.js'

const router = express.Router()

router.get('/', async (req, res) => {
  // const { url } = req.body;
  // const url = 'https://static.france24.com/live/F24_FR_HI_HLS/live_web.m3u8';
  const url = 'https://arte-cmafhls.akamaized.net/am/cmaf/117000/117600/117698-001-A/20250416006E103FF75BD33FEA3FD163DBFFADD1DB/medias/117698-001-A_aud_VO-ANG_1.m3u8';
  try {
    console.log('00000000000:' + url);
    const result = await fetchStream(url)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
