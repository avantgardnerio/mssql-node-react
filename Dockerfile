FROM microsoft/mssql-server-linux:2017-latest

# general
RUN apt-get update
RUN apt-get install -y nano net-tools curl wget gnupg2

# node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm install -g yarn

# MS-SQL
ENV ACCEPT_EULA true
CMD /opt/mssql/bin/sqlservr
