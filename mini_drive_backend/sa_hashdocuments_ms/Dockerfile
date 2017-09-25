FROM ruby:2.3
RUN mkdir /md_hashdocuments_ms
WORKDIR /md_hashdocuments_ms
ADD Gemfile /md_hashdocuments_ms/Gemfile
ADD Gemfile.lock /md_hashdocuments_ms/Gemfile.lock
RUN bundle install
ADD . /md_hashdocuments_ms
