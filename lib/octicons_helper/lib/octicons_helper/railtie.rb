# frozen_string_literal: true

require "rails"

module OcticonsHelper
  class Railtie < Rails::Railtie
    initializer "octicons_helper.helper" do
      ActionView::Base.send :include, OcticonsHelper
    end
  end
end
