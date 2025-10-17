import log from "npmlog";

function setup() {
	log.heading = "[LOG]";
	log.headingStyle = { fg: "blue", bold: true };
	log.prefixStyle = { fg: "cyan", bold: true };

	log.addLevel("info", 2000, { fg: "green", bold: true }, "\b");
	log.addLevel("error", 2000, { fg: "red", bold: true }, "\b");
	log.addLevel("warn", 1500, { fg: "yellow", bold: true }, "\b");
}

setup();

export const Logger = {
	info: (message: string) => log.info("INFO", message),
	error: (message: string) => {
		log.headingStyle = { fg: "red", bold: true };
		log.prefixStyle = { fg: "red", bold: true };
		log.error("ERROR", message);

		setup();
	},
	warn: (message: string) => log.warn("WARN", message),
};
