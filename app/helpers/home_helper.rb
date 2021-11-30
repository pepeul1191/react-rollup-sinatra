module Helpers
  module HomeHelper
    extend self
    def index_css(constants)
      resp = []
      if constants[:static_env] == 'dev'
        resp = [
          'build/bundle.app',
        ]
      else
        resp = [
          'dist/home.min',
        ]
      end
      resp
    end

    def index_js(constants)
      resp = []
      if constants[:static_env] == 'dev'
        resp = [
          'vendor/bootstrap/bootstrap.bundle.min',
          'build/bundle.app',
        ]
      else
        resp = [
          'dist/home.min',
        ]
      end
      resp
    end
  end
end