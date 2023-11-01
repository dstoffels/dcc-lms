const app = require('express')();
const bodyParser = require('body-parser');
const streamToPromise = require('stream-to-promise');
const docker = require('dockerode')(); // dev
// const docker = require('dockerode')({ socketPath: '/var/run/docker.sock' }); // prod
const { getCmd } = require('./utils');
const logger = require('./logger');

app.use(bodyParser.json());

app.use(logger);

app.post('/run', async (req, res) => {
	const { code, language } = req.body;
	let container;

	try {
		container = await docker.createContainer({
			Image: 'dstoffels/code-runner:1',
			Cmd: getCmd(language, code),
			Tty: true,
			HostConfig: {
				CpuPeriod: 100000,
				CpuQuota: 20000,
				Memory: 52428800,
				MemorySwap: 52428800,
			},
		});

		const stream = await container.attach({ stream: true, stdout: true, stderr: true });
		container.start();

		let responseSent = false;

		const timeout = setTimeout(() => {
			container.stop();
			if (!responseSent) {
				res
					// .status(400)
					.json({ output: 'Could not run code. This is likely due to an infinite loop.' });
				responseSent = true;
			}
		}, 5000);

		const output = (await streamToPromise(stream)).toString();

		clearTimeout(timeout);

		if (!responseSent) {
			res.json({ output });
			responseSent = true;
		}
	} catch (err) {
		res.status(400).json(err);
	} finally {
		container.remove();
	}
});

app.listen(4200, () => {
	console.log('Runner API listening on port 4200');
});
