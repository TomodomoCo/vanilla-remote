# vanilla-remote

A work-in-progress tool for programatically controlling a hosted [Vanilla Forums](https://vanillaforums.com/) installation. It is intended to simplify developer workflows by making forum setup and configuration management faster and less prone to human error. Keeping configuration in code (or JSON) also enables revision management and other cool things.

**Functionality goals:**

+ Automatically update/reset Vanilla theme code [in progress]
+ Account creation
+ Set up category structure from JSON
+ Adjust site settings from JSON (desktop/mobile theme, layouts, site name)
+ Activate and update pockets
+ Accessible via CLI or as a Gulp plugin
+ [Your idea here!]

## Caveats

Although some operations may use the Vanilla API, most core functionality is based on reverse-engineered browser requests. In some ways, it has a lot in common with scrapers. As a result, Vanilla Forums may shut down this tool at their discretion. We hope they won't, as we think it's a valuable tool for developers who want to build on the Vanilla platform in an efficient way, but understand if they feel otherwise.

## About Tomodomo

Tomodomo is a creative agency for communities. We focus on unique design and technical solutions to grow community activity and increase customer retention for online networking forums and customer service communities.

Learn more at [tomodomo.co](https://tomodomo.co) or email us: [hello@tomodomo.co](mailto:hello@tomodomo.co)

## License & Conduct

This project is licensed under the terms of the MIT License, included in `LICENSE.md`.

All open source Tomodomo projects follow a strict code of conduct, included in `CODEOFCONDUCT.md`. We ask that all contributors adhere to the standards and guidelines in that document.

Thank you!
