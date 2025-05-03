tester les requtes sql postgresql


query
connect
release


dans ce code


router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM city');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const client = await pool.connect();
  console.log('00000000001:client.connect');
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'INSERT INTO city (name) VALUES ($1) RETURNING *',
      [name]
    );
    await client.query('COMMIT');
    res.status(201).json(rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
    console.log('00000000001:client.release');
  }
});

pourquoi query dans get

et connect dans le post