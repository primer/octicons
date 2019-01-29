FROM node:10

LABEL com.github.actions.name="Figma Action"
LABEL com.github.actions.description="Export image assets from figma to GitHub"
LABEL com.github.actions.icon="image"
LABEL com.github.actions.color="purple"

LABEL repository="http://github.com/octocat/hello-world"
LABEL homepage="http://github.com/actions"
LABEL maintainer="Octocat <octocat@github.com>"

# ADD entrypoint.js /entrypoint.js
WORKDIR /
COPY . /
RUN npm install

ENTRYPOINT [ "node", "/entrypoint.js" ]
# ENTRYPOINT ["/entrypoint.js"]
