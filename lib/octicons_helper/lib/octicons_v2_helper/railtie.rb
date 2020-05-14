require "rails"

module OcticonsV2Helper
  class Railtie < Rails::Railtie
    initializer "octicons_v2_helper.helper" do
      ActionView::Base.send :include, OcticonsV2Helper
    end
  end
end
