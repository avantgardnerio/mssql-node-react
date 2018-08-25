FROM microsoft/mssql-server-linux:2017-latest

# general
RUN apt-get update
RUN apt-get install -y nano net-tools curl wget gnupg2

# node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm install -g yarn

# chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
RUN apt-get install -y \
    gdebi unzip fonts-liberation libappindicator3-1 libasound2 libxss1 xdg-utils \
    libasound2-data libdbusmenu-glib4 libdbusmenu-gtk3-4 libindicator3-7 libnspr4 libnss3
RUN dpkg -i google-chrome-stable_current_amd64.deb

# chromedriver
RUN wget -q https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
RUN apt-get install -y libnss3 libgconf-2-4
RUN unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/bin && \
    chromedriver --version

# MS-SQL
ENV ACCEPT_EULA true
ENV SA_PASSWORD Password!
CMD /opt/mssql/bin/sqlservr & \
    chromedriver --verbose & \
    cd /workspace && \
    yarn build && \
    yarn server-test && \
    CI=true yarn test
