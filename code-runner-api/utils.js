function getCmd(language, code) {
	switch (language) {
		case 'javascript':
			return ['node', '-e', code];
		case 'python':
			return [`python3`, '-c', code];
		case 'c#':
			return [
				'/bin/sh',
				'-c',
				`cp -r template temp && cd temp && echo "${code.replace(
					/"/g,
					'\\"',
				)}" > Program.cs && dotnet run > output.txt && cat output.txt`,
			];
		case 'java':
			return ['/bin/sh', '-c', `echo "${code}" > Main.java && javac Main.java && java Main`];
		default:
			throw new Error('Unsupported language');
	}
}

module.exports = { getCmd };
