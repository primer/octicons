FROM node:10

LABEL com.github.actions.name="Figma Action"
LABEL com.github.actions.description="Export image assets from figma to GitHub"
LABEL com.github.actions.icon="image"
LABEL com.github.actions.color="purple"

LABEL repository="http://github.com/primer/figma-action"
LABEL homepage="http://github.com/primer"
LABEL maintainer="Jon Rohan <yes@jonrohan.codes>"

WORKDIR /
COPY . /
RUN npm install

ENTRYPOINT [ "node", "/entrypoint.js" ]
