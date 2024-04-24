FROM node:20.11.0-alpine

RUN apk add --no-cache bash

WORKDIR /app

RUN mkdir tmp
RUN mkdir -p lib/bin

COPY app/package*.json .
RUN npm install

COPY app .

# Download xpdf-tools-linux-4.05.tar.gz from the specified URL
RUN wget https://dl.xpdfreader.com/xpdf-tools-linux-4.05.tar.gz

# Extract the downloaded tar.gz file
RUN tar -xzvf xpdf-tools-linux-4.05.tar.gz --strip-components=2 -C /app/lib/bin xpdf-tools-linux-4.05/bin64/pdftotext

RUN chmod +x /app/lib/bin/pdftotext

# Clean up unnecessary files
RUN rm -rf xpdf-tools-linux-4.05.tar.gz

RUN  /app/lib/bin/pdftotext --help

EXPOSE 3000
ENTRYPOINT [ "/app/entrypoint.sh", "start" ]
