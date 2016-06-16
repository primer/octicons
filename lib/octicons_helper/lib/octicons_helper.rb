require "octicons_helper/version"
require "octicons_helper/helper"
require "active_support"

ActiveSupport.on_load(:action_view) do
  include OcticonsHelper
end
