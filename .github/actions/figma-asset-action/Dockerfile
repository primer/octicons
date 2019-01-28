FROM node:10

LABEL com.github.actions.name="Figma Export Assets"
LABEL com.github.actions.description="Export image assets from Figma"
LABEL com.github.actions.icon="file-media"
LABEL com.github.actions.color="purple"

LABEL repository="http://github.com/octocat/hello-world"
LABEL homepage="http://github.com/actions"
LABEL maintainer="Octocat <octocat@github.com>"

ADD entrypoint.js /entrypoint.js
ENTRYPOINT ["/entrypoint.js"]
