#
# Altimeter
# Copyright (C) 2024 AKAENE Partners
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

FROM node:16-alpine AS fe-base

WORKDIR /usr/src/app
COPY src/main/webapp/package.json src/main/webapp/package-lock.json ./

FROM fe-base AS fe-dependencies
# install node packages
#RUN npm set progress=false && npm config set depth 0
RUN npm install

FROM fe-dependencies as fe-build
# If an app is supposed to be deployed in a subdir, this is the place to specify that
# Make sure that React app is built using the right path context
COPY src/main/webapp .
RUN npm run build

FROM maven:3.9.6-eclipse-temurin-17-alpine as be-build

COPY pom.xml pom.xml
RUN mvn -B de.qaware.maven:go-offline-maven-plugin:resolve-dependencies

COPY . .
COPY --from=fe-build usr/src/app/build src/main/webapp/build

RUN mvn package -B -P production -DskipTests=true


FROM eclipse-temurin:17.0.10_7-jdk-jammy

COPY --from=be-build target/altimeter.jar .
COPY gdal/3.6.4/jni/libgdalalljni.so ./gdal/

RUN apt-get update && apt-get -y install software-properties-common

RUN apt-get update && add-apt-repository ppa:ubuntugis/ppa
RUN apt-get update
RUN apt-get -y install libgdal-dev \
    && apt-get -y install gdal-data \
    && apt-get -y install gdal-bin

ENV LD_LIBRARY_PATH=/gdal/
ENV GDAL_DATA=/usr/share/gdal

EXPOSE 8080

ENTRYPOINT ["java","-jar","/altimeter.jar"]
