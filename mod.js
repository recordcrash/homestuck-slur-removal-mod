module.exports = {
	title: "Homestuck Slur Removal Mod",
	author: "Makin",
	modVersion: 1.1,
	description: `<p>This is an Unofficial Homestuck Collection mod that censors all the slurs in Homestuck and other Hussie works. Nothing more, nothing less. This is an unopinionated approach: it replaces r-words, n-words and homophobic f-words with asterisked versions, in both text and multimedia.</p><p>I don't recommend using this mod, since Homestuck is a 2009 time capsule and best experienced as a product of its time, this is only a reasonable option for those who feel like they *must* install something.</p><p>I'm open to all feedback and criticism on <a href="https://github.com/recordcrash/homestuck-slur-removal-mod">Github</a>!</p>`,
	settings: {
		boolean: [
			{ model: "censorFutureArachnidsGrip",
			  label: "Censor FUTURE arachnidsGrip",
			  desc: "Check to censor initialism of FUTURE arachnidsGrip." }
		]
	},
	computed(api) {
		store = api.store

		// Default to on
		store.set("censorFutureArachnidsGrip", store.get("censorFutureArachnidsGrip", true))
	},
	trees: {
		'./advimgs/': 'assets://advimgs/',
		'./archive/comics/': 'assets://archive/comics/',
		'./storyfiles/': 'assets://storyfiles/',
		'./sweetbroandhellajeff/': 'assets://sweetbroandhellajeff/'
	},
	edit(archive) {
		function censorTerm(text, terms) {
			if(!text || typeof text !== 'string') return;
			const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			[substr, replacement] = terms
			// Case-sensitive substring replacement
			const regex = new RegExp(escapeRegExp(substr), 'gi');
			text = text.replace(regex, replacement);
			return text
		}

		function censorTermsInBlogspot(pageNumbers, terms) {
			pageNumbers.forEach(pageNumber => {
				archive.social.blogspot[pageNumber].html = censorTerm(archive.social.blogspot[pageNumber].html, terms);
			});
		}

		function censorTermsInDaveBlog(entries, terms) {
			entries.forEach(entry => {
				archive.social.dstrider.find(blogpost => blogpost.id === entry).html = censorTerm(archive.social.dstrider.find(blogpost => blogpost.id === entry).html, terms)
			});
		}

		function censorTermsInFormspring(namespace, pageNumbers, terms) {
			pageNumbers.forEach(pageNumber => {
				archive.social.formspring[namespace][pageNumber].html = censorTerm(archive.social.formspring[namespace][pageNumber].html, terms);
			});
		}

		function censorTermsInTumblr(pageNumbers, terms) {
			pageNumbers.forEach(pageNumber => {
				archive.social.tumblr[pageNumber].html = censorTerm(archive.social.tumblr[pageNumber].html, terms)
			});
		}

		function censorTermsInPages(pages, terms) {
			pages.forEach(pageId => {
				archive.mspa.story[pageId].content = censorTerm(archive.mspa.story[pageId].content, terms)
			});
		}

		// All strings censored by this mod
    	// Note that the mod also replaces images, but they use the same replacements as here
		r_word = ["retard", "r*****"]
		r_word_caps = ["RETARD", "R*****"]
		r_word_terezi = ["R3T4RD", "R*****"]
		r_word_vriska = ["8oy-Skytard", "8oy-Sky****"]

		f_word = ["faggot", "f*****"]
		f_word_short = ["fag", "f**"]
		f_word_caps = ["FAG", "F**"]
		
		n_word = ["nigg", "n***"]

		censorTermsInPages(["000126", "001386", "002054", "002233", "002287", "002718", "002761",
			"002900", "003300", "003423", "003425", "003543", "003982", "004102", "004228",
			"004572", "004604", "004637", "004672", "004736", "004891", "005389", "005598",
			"005609", "005779", "006885"
		], r_word)
		censorTermsInPages(["004443", "004529", "004690", "004751", "004752", "004829", "005152",
			"005261", "005769", "005873", "007380",
		], r_word_caps)

		if(store.get("censorFutureArachnidsGrip", true))
		   censorTermsInPages(["004447", "004654"], f_word_caps);

		censorTermsInPages(["004529"], r_word_terezi)
		censorTermsInPages(["004072"], r_word_vriska)
		censorTermsInPages(["002729"], f_word)

		censorTermsInBlogspot([12, 16], r_word)

		censorTermsInDaveBlog(["candy"], n_word)
		censorTermsInDaveBlog(["candy", "togyhawg"], r_word)

		censorTermsInFormspring("andrewhussie", [36, 237, 547, 879, 984], r_word)
		censorTermsInFormspring("andrewhussie", [24], r_word_caps)
		censorTermsInFormspring("mspadventures", [64, 165], r_word)

		censorTermsInTumblr([23, 60], r_word)
		censorTermsInTumblr([148], f_word_short)
	},
}
