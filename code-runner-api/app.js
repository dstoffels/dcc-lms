const app = require('express')();
const bodyParser = require('body-parser');
const streamToPromise = require('stream-to-promise');
const docker = require('dockerode')({ socketPath: '/var/run/docker.sock' });
const { getCmd } = require('./utils');
const logger = require('./logger');

app.use(bodyParser.json());

app.use(logger);

app.post('/run', async (req, res) => {
	try {
		const { code, language } = req.body;

		const container = await docker.createContainer({
			Image: 'dstoffels/code-runner:1',
			Cmd: getCmd(language, code),
			Tty: true,
		});

		const stream = await container.attach({ stream: true, stdout: true, stderr: true });
		container.start();

		const output = await streamToPromise(stream);

		await container.remove();

		res.json({ output: output.toString() });
	} catch (err) {
		res.status(400).json(err);
	}
});

app.listen(4200, () => {
	console.log('Runner API listening on port 4200');
});
