/**
 * -----------------------------------------------------------------------------------------------------------------
 * Code Enumerations
 */

/**
 * Fetch my Gmail Alias for jacobsprojectsupport@berkeley.edu
 */
const SERVICE_EMAIL = `jacobs-project-support@berkeley.edu`;
const SERVICE_NAME = `Jacobs Robot Support`;

/**
 * Main Sheets
 */
const SHEETS = Object.freeze({
  Applications : SpreadsheetApp.getActiveSpreadsheet().getSheetByName(`Applications`),
});

/**
 * Other Sheets
 */
const OTHERSHEETS = Object.freeze({
  StaffList : SpreadsheetApp.getActiveSpreadsheet().getSheetByName(`Staff List`),
  Logger : SpreadsheetApp.getActiveSpreadsheet().getSheetByName(`Logger`),
});

/**
 * Headernames
 */
const HEADERNAMES = Object.freeze({
  status : `(INTERNAL) Status`,	
  ds : `(INTERNAL) DS Assigned`,	
  priority : `(INTERNAL) Priority`,	
  timestamp : `Timestamp`,	
  email : `Email Address`,
  name : `Name`,	
  affiliation : `What is your affiliation to the Jacobs Institute?`,	
  pi : `If you are a researcher, who is your PI?`,	
  fitness : `Briefly, why do you think the robots are the right tool for you? Can your project be accomplished in ANY other way?`, 	
  experience : `Have you run a CNC before? Do you have any experience with a 3-axis machine?`,	
  exp_length : `How much experience would you say you have with robots and/or machine operation?`,	
  purpose : `Briefly, what are you trying to make and/or what are you trying to do with the robots?`,
  tooling : `What kinds of end-effectors do you intend on putting on the robots? Are you buying the tools or are you building a custom tool? Does your tooling need additional support ( Air / Power / Data)?`,	
  toxicity : `Is your project or process inherently messy, toxic, noxious, or otherwise unhealthy and would require additional support systems for the health and safety of those who work at the Jacobs Institute?`,
  other : `Any additional extenuating circumstances, or other considerations not covered in the above questions, that you feel are important to address?`,
});

/**
 * STATUS
 */
const STATUS = Object.freeze({
  received : `Received`,
  accepted : `Accepted`,
  pending : `Pending Approval`,
  archived : `Archived`,
  rejected : `Rejected`,
  flagged : `Flagged`,
  none : `undefined`,
});

/**
 * Roles
 */
const ROLES = Object.freeze({
	DS : `Design Specialist`,
	SS : `Student Supervisor`,
	MA : `Manager`,
});

/**
 * Colors
 */
const COLORS = Object.freeze({
  green_light : `#d9ead3`, //light green
  greenish : `#93c47d`,  //Greenish
  yellow_light : `#fff2cc`, //light yellow
  yellow : `#f1c232`,  //yellow
  yellow_dark : `#f1c232`,  //Dark Yellow
  orange_light : `#fce5cd`, //light orange
  red : `#a61c00`,  //Red
  red_light : `#f4cccc`, //light red
  grey : `#cccccc`,  //Gray
  grey_light : `#efefef`, //Light Gray
});

/**
 * Student Types
 */
const STUDENT_TYPES = Object.freeze({
  researcher : `Researcher`,
  desinv_faculty : `DES INV Faculty`,
  afil_faculty : `Jacobs-affiliated Course Faculty`,
  mdes_student : `MDES Student`,
  desinv_student : `DES INV Student`,
  engineering_scholar : `Jacobs Engineering Design Scholar`,
  innovation_catalyst : `Innovation Catalysts Grantee`,
  jacobs_staff : `Jacobs Staff (Including Work-studies)`,
  jacobs_student : `Students in Jacobs-affiliated courses (NON-DES INV)`,
  club : `Club and/or Team`,
  other : `Other: Berkeley Faculty, Berkeley Staff`,
  general_students : `General Students`,
});

/**
 * RESPONSE CODES
 */
const RESPONSECODES = Object.freeze({
	200 : `OK`,
	201 : `Created`,
	202 : `Accepted`,
	203 : `Non-Authoritative Information`,
	204 : `No Content`,
	205 : `Reset Content`,
	206 : `Partial Content`,
	207 : `Multi-Status (WebDAV)`,
	208 : `Already Reported (WebDAV)`,
	226 : `IM Used`,
	300 : `Multiple Choices`,
	301 : `Moved Permanently`,
	302 : `Found`,
	303 : `See Other`,
	304 : `Not Modified`,
	305 : `Use Proxy`,
	306 : `(Unused)`,
	307 : `Temporary Redirect`,
	308 : `Permanent Redirect (experimental)`,
 	400 : `Bad Request`,
	401 : `Unauthorized`,
	402 : `Payment Required`,
	403 : `Forbidden`,
	404 : `Not Found`,
	405 : `Method Not Allowed`,
	406 : `Not Acceptable`,
	407 : `Proxy Authentication Required`,
	408 : `Request Timeout`,
	409 : `Conflict`,
	410 : `Gone`,
	411 : `Length Required`,
	412 : `Precondition Failed`,
	413 : `Request Entity Too Large`,
	414 : `Request-URI Too Long`,
	415 : `Unsupported Media Type`,
	416 : `Requested Range Not Satisfiable`,
	417 : `Expectation Failed`,
	418 : `I'm a teapot (RFC 2324)`,
	420 : `Enhance Your Calm (Twitter)`,
	422 : `Unprocessable Entity (WebDAV)`,
	423 : `Locked (WebDAV)`,
	424 : `Failed Dependency (WebDAV)`,
	425 : `Reserved for WebDAV`,
	426 : `Upgrade Required`,
	428 : `Precondition Required`,
	429 : `Too Many Requests`,
	431 : `Request Header Fields Too Large`,
	444 : `No Response (Nginx)`,
	449 : `Retry With (Microsoft)`,
	450 : `Blocked by Windows Parental Controls (Microsoft)`,
	451 : `Unavailable For Legal Reasons`,
	499 : `Client Closed Request (Nginx)`,
	500 : `Internal Server Error`,
	501 : `Not Implemented`,
	502 : `Bad Gateway`,
	503 : `Service Unavailable`,
	504 : `Gateway Timeout`,
	505 : `HTTP Version Not Supported`,
	506 : `Variant Also Negotiates (Experimental)`,
	507 : `Insufficient Storage (WebDAV)`,
	508 : `Loop Detected (WebDAV)`,
	509 : `Bandwidth Limit Exceeded (Apache)`,
	510 : `Not Extended`,
	511 : `Network Authentication Required`,
	598 : `Network read timeout error`,
	599 : `Network connect timeout error`,
});

/**
 * Banned Gen Z Bullshit
 */
const BANNED_WORDS = Object.freeze({
  AF : `AF`,
  AESTHETIC : `Aesthetic`,
  BADDIE : `Baddie`,
  BAKA  : `Baka`,
  BASIC : `Basic`,
  BET : `Bet`,
  BIG_YIKES : `Big yikes`,
  BOP : `Bop`,
  BOOMER : `Boomer`,
  BOOMER_ENERGY : `Boomer energy`,
  BOUJEE : `Boujee`,
  BRO  : `Bro`,
  BRUH  : `Bruh`,
  BUSSIN : `Bussin`,
  CAP : `Cap`,
  NO_CAP : `No Cap`,
  CANCEL : `Cancel`,
  CEO_OF : `CEO of...`,
  CHEUGY : `Cheugy`,
  CLOUT : `Clout`,
  CRINGE : `Cringe`,
  CUFFING_SEASON : `Cuffing season`,
  DEADASS : `Deadass`,
  DRIP : `Drip`,
  DUB : `Dub`,
  EXTRA : `Extra`,
  FAM : `Fam`,
  FINESSE : `Finesse`,
  FINNA : `Finna`,
  FIRE : `Fire`,
  FINSTA : `Finsta`,
  FLEX : `Flex`,
  GAS : `Gas`,
  GATEKEEPING : `Gatekeeping`,
  GHOST : `Ghost`,
  GLOW_UP : `Glow up`,
  GOAT : `GOAT`,
  GUCCI : `Gucci`,
  GYAH : `Gyah`,
  HITS_DIFFERENT : `Hits different`,
  HIGH_KEY : `High Key`,
  LOW_KEY : `Low Key`,
  IYKYK : `IYKYK`,
  ITS_GIVING : `It’s giving`,
  KAREN : `Karen`,
  LIT : `Lit`,
  LOVE_THAT_FOR_YOU : `Love that for you`,
  MAIN_CHARACTER : `Main character`,
  MAIN_CHARACTER_ENERGY : `Main character energy`,
  MID : `Mid`,
  MOOD : `Mood`,
  NO_SHADE : `No shade`,
  OOF : `Oof`,
  ON_FLEEK : `On fleek`,
  ON_GOD : `On God`,
  POGGERS : `Poggers`,
  PERIODT : `Periodt`,
  RECEIPTS : `Receipts`,
  RENT_FREE : `Rent-free`,
  RIZZ : `Rizz`,
  RONA : `Rona`,
  SALTY : `Salty`,
  SAVAGE : `Savage`,
  SAY_LESS : `Say Less`,
  SHOOK : `Shook`,
  SHOOKETH : `Shooketh`,
  SHEESH : `Sheesh`,
  SIGMA : `Sigma`,
  SIMP : `Simp`,
  SLAPS : `Slaps`,
  SLAY : `Slay`,
  SKSKSK : `Sksksk`,
  SMOL : `Smol`,
  SNACK : `Snack`,
  SQUAD : `Squad`,
  STAN : `Stan`,
  SUS : `Sus`,
  TEA : `Tea`,
  THICC : `Thicc`,
  THIRST_TRAP : `Thirst trap`,
  TYPE_S : `Type S ______`,
  VIBE_CHECK : `Vibe check`,
  W : `W`,
  WIG : `Wig`,
  WIG_SNATCHED : `Wig snatched`,
  WOKE : `Woke`,
  YASS : `Yass`,
  YEET : `Yeet`,
  YOU_DOIN_TOO_MUCH : `You doin too much`,
});



